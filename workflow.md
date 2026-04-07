# JusticeAI 8B Cloud Training & Deployment Workflow

Because local fine-tuning of an 8B parameter model requires 24GB+ of GPU VRAM (which most local laptops do not have, causing `cook.py` to gracefully fail at Phase 5), you must execute the actual training on a cloud GPU. 

Follow this step-by-step workflow to successfully train and deploy your model.

## Phase 1: Prepare Local Files
1. Your local `cook.py` has already successfully completed Phases 1-4 (Scraping, Local PDF extraction, HuggingFace loading, and Deduplication).
2. Create a ZIP archive of your local working directory. **Ensure you include:**
   - `cook.py`
   - `Modelfile`
   - Your local PDF folder (if any)
   - The `scraped_data_comprehensive/` folder (so the cloud GPU doesn't have to re-scrape the websites)

## Phase 2: Cloud GPU Environment setup (Google Colab Pro / RunPod)
1. Open Google Colab and select an **A100 GPU** or **L4 GPU** runtime (or provision an RTX 3090/4090 on RunPod).
2. Upload and extract your ZIP file into the workspace.
3. Run the following command in an execution cell to install the mandatory CUDA dependencies:
   ```bash
   pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"
   pip install --no-deps "xformers<0.0.27" "trl<0.9.0" peft accelerate bitsandbytes
   ```

## Phase 3: Execute the "Cook"
1. Run the pipeline in the cloud terminal:
   ```bash
   python cook.py
   ```
2. The script will automatically skip Phase 1-4 (because of your zipped cache) and immediately begin Phase 5: LoRA initialization and 4-bit loading.
3. **Wait for training to complete.** This will take approximately 2-4 hours for 2,000 steps depending on your GPU. Watch the Loss metric—it should start around `2.5` and drop below `1.0`.

## Phase 4: GGUF Export & Download
1. Once training hits 100%, `cook.py` will automatically run Phase 6.
2. It will merge your LoRA adapters into a single standalone GGUF file categorized as `q5_k_m` (optimized for accuracy).
3. The final output file will be named something like `model-unsloth.Q5_K_M.gguf`. 
4. **Download this `.gguf` file back to your local Windows PC** and place it in your `Justice-AI` folder.

## Phase 5: Local Serving via Ollama
1. Open your local terminal in the project directory.
2. Open `Modelfile` and edit line 1 to point to your new downloaded file:
   ```text
   FROM ./model-unsloth.Q5_K_M.gguf
   ```
3. Compile the model into Ollama by running:
   ```bash
   ollama create justiceai-8b -f Modelfile
   ```
4. Test it in your terminal:
   ```bash
   ollama run justiceai-8b "What is Section 302 of the IPC?"
   ```
   *(Ensure it produces the exact disclaimer at the end of its output).*

## Phase 6: React Frontend Integration
1. Run your dashboard:
   ```bash
   npm run dev
   ```
2. Your AI Chat component is now successfully routed to your completely custom, fine-tuned legal model running entirely locally on your machine with zero API costs.
