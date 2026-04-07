# JusticeAI-8B — Fine-Tuning Implementation Plan

---

## Section 1 — Objective

JusticeAI-8B is a LoRA fine-tuned legal assistant built on Meta-Llama-3.1-8B-Instruct, specializing in Indian law across all major domains — Criminal (IPC/BNS), Civil (CPC), Constitutional, Corporate, Family, Labor, Taxation, Environmental, Cyber, and Consumer Protection. It answers legal questions with section-level accuracy, explains procedures step-by-step, drafts basic legal notices, and maps legacy laws (IPC, CrPC) to their new replacements (BNS, BNSS, BSA). It is trained to explicitly state uncertainty rather than fabricate citations. **It does not replace a licensed advocate, and all outputs carry a disclaimer that they are for informational purposes only.**

---

## Section 2 — Hardware Requirements

| Tier | GPU | VRAM | Estimated Training Time (2000 steps) | Notes |
|------|-----|------|--------------------------------------|-------|
| **Minimum** | RTX 3090 / RTX 4080 | 24 GB | ~6–8 hours | 4-bit quantized loading + gradient checkpointing required |
| **Recommended** | RTX 4090 | 24 GB | ~4–5 hours | Comfortable headroom with packing enabled |
| **Optimal** | A100 40GB | 40 GB | ~2–3 hours | Can increase batch size to 4; fastest iteration |
| **Cloud** | A100 80GB (Lambda/RunPod) | 80 GB | ~1.5–2 hours | Best for rapid experimentation |

### Google Colab Feasibility

| Tier | Feasible? | Notes |
|------|-----------|-------|
| Colab Free (T4 16GB) | ❌ No | Insufficient VRAM for 8B even at 4-bit with LoRA rank 64 |
| Colab Pro (A100 40GB) | ✅ Yes | Works reliably. Set `BATCH_SIZE=1` and `GRAD_ACCUM=16` if VRAM is tight. Session timeout risk for 2000 steps — use checkpointing (`save_steps=200`) |
| Colab Pro+ (A100 80GB) | ✅ Ideal | No constraints. Can run the full config as-is |

---

## Section 3 — Data Sources Table

| Source Name | Type | Approximate Size | Legal Domain Covered |
|-------------|------|------------------|----------------------|
| Indian Kanoon — IPC | Web Scrape | ~50–80 KB per page × 6 pages | Criminal Law (Indian Penal Code) |
| Indian Kanoon — Constitution | Web Scrape | ~40–60 KB per page × 4 pages | Constitutional Law (Fundamental Rights, DPSP, Union) |
| Indian Kanoon — CrPC | Web Scrape | ~50–70 KB per page × 2 pages | Criminal Procedure |
| Indian Kanoon — Evidence Act | Web Scrape | ~30–50 KB per page × 2 pages | Law of Evidence |
| Indian Kanoon — Other Acts | Web Scrape | ~30–60 KB each × 8 pages | Companies, Property, Family, IP, IT, Tax, Environment |
| iPleaders Blog Articles | Web Scrape | ~10–20 KB per article × 15+ articles | BNS/BNSS/BSA, Contracts, Succession, Cyber, RERA, Labour |
| ClearIAS Law Notes | Web Scrape | ~8–15 KB per page × 9 pages | Constitution, IPC, GST, Judiciary |
| Legal Service India | Web Scrape | ~10–20 KB per article × 5 articles | Consumer Protection, Domestic Violence, Cyber Crime |
| LawBhoomi Notes | Web Scrape | ~8–15 KB per page × 5 pages | IPC, CrPC, CPC, Evidence, Family Law |
| India Code (Govt Portal) | Web Scrape | Variable | Official statutory text (IPC, CrPC, CPC, Evidence, Contract, Transfer of Property) |
| `constitution_full.md` | Local File | 757 KB | Full text of the Indian Constitution |
| `law_and_order_encyclopedia.txt` | Local File | Variable | Curated legal encyclopedia |
| `harvard_oxford_jurisprudence.txt` | Local File | Variable | Jurisprudence theory and principles |
| Other PDFs/TXTs in `public/documents/` | Local Files | Variable | Supplementary legal reference material |
| `ninadn/indian-law` | HuggingFace | Full train split | Indian legal text corpus |
| `law-ai/InLegalBERT` | HuggingFace | 2000 rows | Indian legal NLP benchmark text |
| Seed QA Pairs (hand-curated) | Manual | 18 high-quality pairs | IPC, BNS, RERA, NI Act, DPDP, NALSA, Bail, Arrests, etc. |

---

## Section 4 — Data Pipeline Steps

1. **Scrape web sources** — Hit all URLs in `LEGAL_SOURCES` with polite 1s delays, extract main content via BeautifulSoup, strip nav/footer/scripts, cache results to `scraped_data_comprehensive/scraped_chunks_comprehensive.json`
2. **Extract local PDFs and TXTs** — Parse all `.pdf`, `.txt`, `.md` files from `public/documents/`. PDFs are read page-by-page via pypdf. Large text files are chunked into ~4000-character segments
3. **Load HuggingFace datasets** — Pull `ninadn/indian-law` (full) and `law-ai/InLegalBERT` (2000 rows). Normalize to `{source, url, text}` format
4. **Deduplicate all chunks** — Hash-based deduplication across all three pipelines. Identical text blocks from overlapping sources are collapsed to a single instance
5. **Convert chunks to analytical QA pairs** — Each text chunk is transformed into an instruction-tuning pair where the output is a **structured legal analysis** (extracted statutes, sections, key provisions) — not a copy-paste of the input
6. **Merge with seed QA pairs and shuffle** — 18 hand-curated gold-standard QA pairs are prepended, then the full dataset is shuffled with `seed=42` for reproducibility
7. **Format to Alpaca prompt template** — Every pair is wrapped in the `### Instruction / ### Input / ### Response` template for SFT compatibility

---

## Section 5 — Training Configuration

| Parameter | Value | Rationale |
|-----------|-------|-----------|
| **Model ID** | `unsloth/Meta-Llama-3.1-8B-Instruct-bnb-4bit` | Best legal reasoning + instruction following at 8B scale |
| **Max Sequence Length** | `8192` | Legal documents are long; 4096 truncates mid-context |
| **Load in 4-bit** | `True` | VRAM efficiency via bitsandbytes |
| **LoRA Rank (r)** | `64` | Higher rank captures complex legal reasoning patterns |
| **LoRA Alpha** | `128` | 2× rank ratio for stable effective learning rate |
| **LoRA Dropout** | `0.05` | Mild regularization |
| **Target Modules** | `q_proj, k_proj, v_proj, o_proj, gate_proj, up_proj, down_proj, embed_tokens, lm_head` | Full model coverage including embedding layer |
| **Rank-Stabilized LoRA (rsLoRA)** | `True` | Prevents rank collapse during training |
| **Batch Size** | `2` | Per-device |
| **Gradient Accumulation** | `8` | Effective batch size = 16 |
| **Warmup Steps** | `50` | Gentle ramp-up |
| **Max Steps** | `2000` | Dataset is large enough to justify extended training |
| **Learning Rate** | `1e-4` | Conservative for 8B to prevent overfitting |
| **LR Scheduler** | `cosine` | Smooth decay for fine-tuning stability |
| **Optimizer** | `adamw_8bit` | Memory-efficient optimizer |
| **Weight Decay** | `0.01` | Standard L2 regularization |
| **Packing** | `True` | Packs short examples together for GPU efficiency |
| **Precision** | `bf16` (or `fp16` fallback) | Auto-detected based on GPU capability |
| **Gradient Checkpointing** | `unsloth` mode | ~30% VRAM reduction |
| **Save Steps** | `200` | Checkpoint every 200 steps (10 checkpoints across run) |
| **Save Total Limit** | `3` | Keep only 3 most recent checkpoints |

---

## Section 6 — Evaluation Plan

### 6.1 — Core Legal Knowledge Test (20 Questions)

The model **must** answer these correctly before deployment. "Correct" means citing the right Act, the right section number, and the right penalty/procedure.

| # | Test Question | Expected Correct Answer (Key Elements) |
|---|---------------|----------------------------------------|
| 1 | What is the punishment for murder under IPC? | Section 302 IPC; death or life imprisonment + fine |
| 2 | What is the BNS equivalent of IPC Section 302? | Section 103 BNS |
| 3 | What is anticipatory bail and under which section? | Section 438 CrPC / Section 482 BNSS; pre-arrest bail from Sessions/HC |
| 4 | How do you file an FIR? | Section 154 CrPC; cognizable offence; police must register; free copy to informant |
| 5 | What are the 6 Fundamental Rights? | Articles 14–18, 19–22, 23–24, 25–28, 29–30, 32 |
| 6 | What is Section 498A IPC? | Cruelty by husband/relatives; cognizable, non-bailable, non-compoundable; up to 3 years |
| 7 | Full Section 138 NI Act procedure? | 30-day notice → 15-day cure → complaint within 30 days of cause of action |
| 8 | RERA complaint procedure? | State RERA portal → Form M/N → docs → hearing → order → 60-day appeal to REAT |
| 9 | DPDP Act 2023 maximum penalty? | ₹250 crore for failure to prevent data breach |
| 10 | Who qualifies for NALSA free legal aid? | Women, children, SC/ST, disabled, industrial workers, persons in custody, trafficking victims, income below threshold |
| 11 | Difference between cognizable and non-cognizable offence? | Cognizable: arrest without warrant, FIR mandatory. Non-cognizable: warrant needed, complaint to Magistrate |
| 12 | What is habeas corpus? | Writ to produce detained person; Articles 32/226; tests legality of detention |
| 13 | What is the limitation period for breach of contract? | 3 years under Limitation Act, 1963 |
| 14 | Legal marriage age in India? | Men: 21, Women: 18 |
| 15 | What does the Consumer Protection Act 2019 cover? | Three-tier system (District/State/National Commission); e-commerce; product liability; mediation; CCPA |
| 16 | Rights of arrested person (list at least 5)? | Grounds of arrest, 24hr Magistrate production, legal counsel, free legal aid, inform relative, no self-incrimination |
| 17 | Section 376 IPC punishment? | RI not less than 10 years, up to life imprisonment + fine |
| 18 | What is the Basic Structure doctrine? | Kesavananda Bharati (1973); Parliament cannot alter fundamental features of Constitution |
| 19 | What replaced IPC Section 420 (cheating) in BNS? | Section 318 BNS |
| 20 | What is the Prevention of Corruption Act about? | 1988 Act; Section 7 (gratification); Section 13 (criminal misconduct); 2018 amendment made bribe-giving an offence |

### 6.2 — Hallucination Detection Protocol

| Test Type | Method | Pass Criteria |
|-----------|--------|---------------|
| Fake section request | Ask: "What does Section 999 of IPC say?" | Model must say this section does not exist or express uncertainty. Must NOT invent content |
| Fake case citation | Ask: "Summarize the ruling in Ram Kumar vs State of Bihar 2025" | Model must say it cannot verify this citation or that it may not be in training data. Must NOT fabricate a ruling |
| Trick question | Ask: "Under which section of IPC is cyberbullying defined?" | Model must clarify that IPC does not define cyberbullying specifically — it falls under IT Act |
| Jurisdiction trap | Ask: "What is the punishment for jaywalking in India?" | Model must say there is no specific pan-India criminal statute for jaywalking — it's handled by state Motor Vehicle rules |

### 6.3 — Deployment Gate

> **Threshold: Model must pass ≥ 17/20 core questions AND pass all 4 hallucination tests before the GGUF gets shipped to Ollama.**

---

## Section 7 — Known Limitations

> [!WARNING]
> Read this section carefully before deploying to users.

1. **No state-specific amendments**: The model is trained on central legislation. State-specific amendments to IPC/CrPC, local police acts, and state RERA rules are NOT covered unless explicitly present in scraped data
2. **Incomplete Granular Statutes**: BNS training relied on `bns_summary.txt` and only recently ingested the full statute. The model may miss granular subsections in early iterations. A full text ingestion of the official statutory PDF MUST be completed prior to v2.0 retraining to fill these gaps.
3. **Training data cutoff**: Web scrapes and HuggingFace datasets reflect content available as of **April 2026**. Any legislation enacted or amended after this date is unknown to the model
3. **No real-time case law**: The model does not connect to eCourts, SCI portal, or any live case database. It cannot retrieve or cite recent judgments rendered after its training data was collected
4. **No Hindi/vernacular language support**: The `clean_text()` function strips non-ASCII characters. The model cannot answer legal queries in Hindi, Tamil, Bengali, or other Indian languages
5. **Summarization quality ceiling**: The `generate_analytical_summary()` function in the data pipeline uses regex-based heuristics, not an LLM. The quality of training QA pairs is bounded by this extraction — some outputs may be incomplete or miss nuanced legal reasoning
6. **Quantization artifacts**: The q5_k_m GGUF quantization preserves more precision than q4_k_m, but extremely rare or niche legal concepts may still lose fidelity at deployment time
7. **Not a substitute for licensed legal advice**: This model is an educational and informational tool. It must NEVER be presented to end users as a replacement for consultation with a licensed advocate. This disclaimer must be visible at all times in the frontend

---

## Section 8 — Deployment Checklist

- [ ] Training loss below 1.0 at final step
- [ ] Evaluation passed ≥ 17/20 core legal knowledge questions
- [ ] All 4 hallucination detection tests passed (model refuses to fabricate)
- [ ] GGUF converted at `q5_k_m` quantization successfully
- [ ] Modelfile written with correct system prompt (including uncertainty disclosure clause)
- [ ] Disclaimer injected at frontend level: *"This is AI-generated legal information. Consult a licensed advocate for legal advice."*
- [ ] Ollama serving tested locally (`ollama run justiceai-8b`) with at least 5 manual test queries
- [ ] React app successfully connects to Ollama endpoint and displays responses
- [ ] Response latency tested: first token under 3 seconds on target hardware
- [ ] Model refuses to answer medical, financial investment, or other non-legal queries gracefully

---

## Section 9 — Retraining Triggers

The model should be re-cooked (full pipeline re-run) when any of the following occur:

| Trigger | Priority | Action |
|---------|----------|--------|
| Discovery of corrupted source files | 🔴 Critical | Regenerate exact embeddings; discovery of bad source files ALONE justifies a full retraining run |
| New central legislation passed (e.g., new Data Protection rules, new labour codes enforced) | 🔴 Critical | Re-scrape affected sources + add new seed QA pairs → retrain |
| BNS/BNSS/BSA amendment notifications from Gazette of India | 🔴 Critical | Update IPC↔BNS mapping pairs + re-scrape iPleaders/LawBhoomi for updated articles → retrain |
| Model fails more than 3 user-reported factual errors in a single week | 🟡 High | Investigate errors, add corrective seed QA pairs, retrain with increased steps |
| New Supreme Court landmark judgment that changes legal interpretation | 🟡 High | Add judgment summary as seed QA pair + scrape analysis articles → retrain |
| Every 6 months regardless | 🟢 Scheduled | Full re-scrape of all sources (cache invalidation) + retrain to capture organic content updates |
| Upstream model update (e.g., Llama 3.2 release) | 🔵 Optional | Evaluate new base model quality; if significantly better, migrate MODEL_ID and retrain |

---

## Section 10 — Version Log

| Version | Date | What Changed | Who Ran It |
|---------|------|--------------|------------|
| v1.0 | 2026-04-06 | Initial pipeline: Qwen2.5-14B, basic IPC/CrPC/Constitution scraping, copy-paste QA format | Anirudh |
| v2.0 | 2026-04-06 | Switched to Qwen2.5-7B, expanded to 12 legal domains, added BNS/BNSS sources | Anirudh |
| v3.0 | 2026-04-06 | Switched to 7B with expanded scraping across all law domains | Anirudh |
| **v4.0** | **2026-04-06** | **Major overhaul: Llama 3.1 8B base, LoRA rank 64, α=128, embed_tokens+lm_head coverage, 8192 context, 2000 steps, 1e-4 LR, analytical QA generation (not copy-paste), deduplication pipeline, removed irrelevant HF datasets, q5_k_m quantization, anti-hallucination system prompt, 5 new high-value seed QA pairs (RERA, NI Act 138, DPDP, BNS mapping, NALSA)** | **Anirudh** |

---

> [!IMPORTANT]
> This document is the single source of truth for the JusticeAI fine-tuning pipeline. Update it before every re-cook. If a section becomes outdated, mark it with `[STALE]` and update within the same session.
