Here’s the updated README.md text including a note about Groq Cloud as the AI API:

# Universal Book Summarizer  

A user-friendly application to summarize books from PDF files using advanced AI text processing via **Groq Cloud**. This program allows you to upload a PDF file, process its content, and receive a concise, high-quality summary.  

## Features
- Upload any PDF file via a sleek, modern GUI.
- Summarize books quickly and accurately using AI-driven insights powered by **Groq Cloud**.
- Intuitive dark mode UI for a comfortable user experience.
- Hover-enabled buttons for enhanced interactivity.
- Flexible and adaptable for various book genres and sizes.

## How It Works
1. Launch the application.
2. Use the "Choose PDF File" button to upload your desired PDF book.
3. Click "Summarize PDF" to generate a summary using **Groq Cloud's AI API**.
4. View the summary directly within the application.

## Prerequisites
To run this project, you need:  
- Python 3.10 or newer.
- Libraries:  
  - `tkinter`
  - `PyPDF2`
  - `groq`
  - `customtkinter`

Install the dependencies using:
```bash
pip install PyPDF2 customtkinter groq

Setup
	1.	Clone this repository to your local machine:

git clone https://github.com/your-username/universal-book-summarizer.git
cd universal-book-summarizer


	2.	Replace the placeholder for the API key in main.py with your Groq API key:

api_key = "your_groq_api_key_here"


	3.	Run the application:

python main.py



Project Structure
	•	main.py: Contains the main logic of the program and handles the GUI and summarization process.
	•	prompts.py: Holds the AI prompt for generating summaries.
	•	README.md: Documentation for understanding and using the project.

Powered by Groq Cloud

This application utilizes Groq Cloud as the AI API for generating summaries. The API is robust, reliable, and capable of processing complex textual data to extract meaningful insights.
