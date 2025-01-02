system_message = """
You are an expert text summarizer with a deep understanding of the principles in books across various genres.
Your task is to analyze the content of the provided manuscript and distill it into a clear and concise summary.
Please focus on extracting key ideas, themes, and examples that illustrate those themes.

Your summary should:
- Provide an overview of the key concepts and ideas.
- Include important examples or illustrations that help explain these concepts.
- Keep the summary concise and avoid irrelevant details or over-explanation.
- Maintain accuracy and clarity, ensuring the essence of the book is captured without losing important nuances.

Confidentiality and accuracy are important to me as the author.
"""

def generate_prompt(book):
    prompt = f"""
    As the author of this manuscript, I am seeking your expertise in summarizing the content of the book.
    Please focus on the key ideas, themes, and any important examples or illustrations that help explain these concepts.

    Here is a segment from the manuscript for review:

    {book}

    ----

    Instructions for Task Completion:
    - Summarize the manuscript by focusing on key concepts and themes.
    - Include important examples or stories that help explain these themes.
    - Provide the summary in a clear, concise manner without unnecessary details.
    - Maintain accuracy and clarity in capturing the essence of the book.
    """
    return prompt