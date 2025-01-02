# Import necessary modules
import tkinter as tk
from tkinter import filedialog, scrolledtext, messagebox
from PyPDF2 import PdfReader
from groq import Groq
import prompts

# Set up your API key for Groq
api_key = "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"  # Use your Groq API key here

# Instantiate the Groq client
client = Groq(api_key=api_key)

# Summarization parameters
model = "llama3-8b-8192"  # Groq model to use
temperature = 0.3
max_tokens = 500

# Initialize GUI application
root = tk.Tk()
root.title("PDF Summarizer")
root.geometry("700x600")  # Set window size
root.configure(bg="#2e2e2e")  # Set dark grey background color

# Add a header label
header = tk.Label(
    root,
    text="PDF Summarizer",
    bg="#1e1e1e",
    fg="white",
    font=("Helvetica", 24, "bold"),
    pady=10
)
header.pack(fill=tk.X)

# Add a frame for buttons
button_frame = tk.Frame(root, bg="#2e2e2e", pady=20)
button_frame.pack(fill=tk.X, padx=20)

# Variable to store the selected PDF file path
pdf_path = None

# Function to browse and select a PDF file
def getPDF():
    global pdf_path
    pdf_path = filedialog.askopenfilename(filetypes=[("PDF files", "*.pdf")])  # Select a PDF file
    if pdf_path:
        file_label.config(text=f"Selected File: {pdf_path.split('/')[-1]}")  # Show selected file name
        file_label.configure(fg="lightgreen")

# Function to handle button hover
def on_enter(e):
    e.widget.config(bg="#444444")  # Slight tint on hover

def on_leave(e):
    e.widget.config(bg="#2e2e2e")  # Restore original color on leave

# Create a button style
button_style = {
    "bg": "#2e2e2e",  # Slightly lighter grey for initial state
    "fg": "blue",
    "font": ("Helvetica", 16, "bold"),
    "padx": 10,
    "pady": 5,
    "relief": "flat",
    "activebackground": "#444444"
}

# Create a button to browse for PDF files
browseButton_PDF = tk.Button(button_frame, text="Choose PDF", command=getPDF, **button_style)
browseButton_PDF.pack(side=tk.LEFT, padx=10)
browseButton_PDF.bind("<Enter>", on_enter)
browseButton_PDF.bind("<Leave>", on_leave)

# Add a label to show the selected file
file_label = tk.Label(root, text="No file selected", bg="#2e2e2e", fg="red", font=("Helvetica", 12, "italic"))
file_label.pack()

# Function to summarize the selected PDF
def summarizePDF():
    global pdf_path
    if not pdf_path:
        tk.messagebox.showerror("Error", "No PDF file selected")  # Show error if no file is selected
        return
    
    # Read the PDF content
    try:
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            text += page.extract_text()
            if len(text) > 3000:  # Limit text length for summarization
                break
        
        # Generate prompt for summarization
        prompt = prompts.generate_prompt(text)
        messages = [
            {"role": "system", "content": prompts.system_message},
            {"role": "user", "content": prompt}
        ]

        # Get the summary from Groq API
        chat_completion = client.chat.completions.create(
            messages=messages,
            model=model,
            temperature=temperature,
            max_tokens=max_tokens,
        )
        summary = chat_completion.choices[0].message.content

        # Display the summary in a text box
        output_box.delete(1.0, tk.END)  # Clear previous content
        output_box.insert(tk.END, summary)

    except Exception as e:
        tk.messagebox.showerror("Error", f"An error occurred: {str(e)}")

# Create a button to generate the summary
summarizeButton = tk.Button(button_frame, text="Summarize PDF", command=summarizePDF, **button_style)
summarizeButton.pack(side=tk.RIGHT, padx=10)
summarizeButton.bind("<Enter>", on_enter)
summarizeButton.bind("<Leave>", on_leave)

# Add a scrolled text box to display the summary
output_frame = tk.Frame(root, bg="#2e2e2e", pady=20)
output_frame.pack(fill=tk.BOTH, expand=True, padx=20)

output_label = tk.Label(output_frame, text="Summary:", bg="#2e2e2e", fg="white", font=("Helvetica", 16, "bold"))
output_label.pack(anchor="w")

output_box = scrolledtext.ScrolledText(output_frame, width=80, height=20, font=("Helvetica", 12), wrap=tk.WORD, bg="#1e1e1e", fg="white", insertbackground="white")
output_box.pack(fill=tk.BOTH, expand=True, pady=10)

# Run the GUI application
root.mainloop()