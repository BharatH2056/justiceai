# Fine-Tuning JusticeAI Knowledge Base

This guide outlines how to fine-tune your model (like Gemma 4 or Llama 3) on the Indian Law PDFs using **Unsloth**. Unsloth makes training 2x faster and uses 70% less VRAM.

> [!WARNING]
> Fine-tuning requires a dedicated Nvidia GPU (minimum 8GB VRAM for 8B models, 16GB+ recommended). If your local machine does not have a powerful GPU, run this script in **Google Colab (T4 or A100)**.

### Prerequisites

You need Python 3.10+ and an NVIDIA GPU.
Install dependencies:
```bash
pip install "unsloth[colab-new] @ git+https://github.com/unslothai/unsloth.git"
pip install --no-deps "xformers<0.0.27" "trl<0.9.0" peft accelerate bitsandbytes
pip install pypdf
```

### The Fine-Tuning Script (`finetune_law_model.py`)

Place your downloaded PDFs inside a `raw_data` folder in the same directory as this script. 
This script extracts text from the PDFs, formats it into a continuous training corpus, and applies LoRA fine-tuning.

```python
import os
from pypdf import PdfReader
from unsloth import FastLanguageModel
import torch
from trl import SFTTrainer
from transformers import TrainingArguments
from datasets import Dataset

# 1. Configuration
max_seq_length = 2048 
dtype = None # Auto detection
load_in_4bit = True # Use 4bit quantization to reduce memory usage

# We'll use unsloth's base models for Gemma
model_id = "unsloth/gemma-7b-bnb-4bit"

# 2. Extract Data from PDFs
raw_text_chunks = []
pdf_folder = "./raw_data"

if not os.path.exists(pdf_folder):
    os.makedirs(pdf_folder)
    print("Please place your law PDFs in the './raw_data' folder and run again.")
    exit()

print("Extracting text from PDFs...")
for document in os.listdir(pdf_folder):
    if document.endswith(".pdf"):
        print(f"Reading {document}...")
        reader = PdfReader(os.path.join(pdf_folder, document))
        for page in reader.pages:
            text = page.extract_text()
            if text and len(text.strip()) > 50:
                # We format this as a raw completion task to force the model to memorize the language
                raw_text_chunks.append({"text": text.strip()})

if not raw_text_chunks:
    print("No textual data found in the PDFs.")
    exit()

dataset = Dataset.from_list(raw_text_chunks)
print(f"Loaded {len(dataset)} pages/chunks of legal knowledge.")

# 3. Load Model and Tokenizer
print("Loading Model...")
model, tokenizer = FastLanguageModel.from_pretrained(
    model_name = model_id,
    max_seq_length = max_seq_length,
    dtype = dtype,
    load_in_4bit = load_in_4bit,
)

# 4. Add LoRA Adapters (This makes fine-tuning possible on consumer GPUs)
model = FastLanguageModel.get_peft_model(
    model,
    r = 16, # Target modules rank
    target_modules = ["q_proj", "k_proj", "v_proj", "o_proj", "gate_proj", "up_proj", "down_proj",],
    lora_alpha = 16,
    lora_dropout = 0,
    bias = "none",
    use_gradient_checkpointing = "unsloth",
    random_state = 3407,
    use_rslora = False,
    loftq_config = None,
)

# 5. Initialize Trainer
trainer = SFTTrainer(
    model = model,
    tokenizer = tokenizer,
    train_dataset = dataset,
    dataset_text_field = "text",
    max_seq_length = max_seq_length,
    dataset_num_proc = 2,
    packing = False, # Can make training faster for short sequences
    args = TrainingArguments(
        per_device_train_batch_size = 2,
        gradient_accumulation_steps = 4,
        warmup_steps = 5,
        max_steps = 60, # Increase this for real training (e.g., 500-1000)
        learning_rate = 2e-4,
        fp16 = not torch.cuda.is_bf16_supported(),
        bf16 = torch.cuda.is_bf16_supported(),
        logging_steps = 1,
        optim = "adamw_8bit",
        weight_decay = 0.01,
        lr_scheduler_type = "linear",
        seed = 3407,
        output_dir = "outputs",
    ),
)

# 6. Train!
print("Starting Fine-tuning...")
trainer_stats = trainer.train()

# 7. Save the Fine-Tuned Model
# Once done, we save the LoRA adapters
model.save_pretrained("justice_ai_law_model") # Local saving
tokenizer.save_pretrained("justice_ai_law_model")

print("Fine-tuning complete! Model saved to 'justice_ai_law_model'.")
# To use this in Ollama: 
# You need to export it to GGUF format. Unsloth provides saving to GGUF out of the box:
# model.save_pretrained_gguf("model", tokenizer, quantization_method = "q4_k_m")
```

### Next Steps for Fine-tuning
1. Run the script: `python finetune_law_model.py`.
2. To use the fine-tuned model in Ollama, you will export it to a GGUF file using Unsloth's built-in exporter.
3. Import the exact GGUF file into Ollama via a `Modelfile`.
