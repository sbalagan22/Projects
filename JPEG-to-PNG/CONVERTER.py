# Import necessary modules
import tkinter as tk
from tkinter import filedialog
from PIL import Image

# Create the root window for the GUI application
root = tk.Tk()   
root.title('Converter')  # Set window title

# Create a canvas widget to hold other widgets
canvas1 = tk.Canvas(root, width=400, height=280, bg='gray', relief='raised')
canvas1.pack()  # Pack the canvas into the root window

# Create a label widget for the window title
label1 = tk.Label(root, text='File Converter', bg='gray', fg='black')   
label1.config(font=('helvetica', 40, 'bold'))  # Set font style and size for the label
canvas1.create_window(200, 50, window=label1)  # Add label to the canvas at position (200, 50)

# Initialize a variable to store the image
im1 = None 

# Function to browse and select a JPEG file using a file dialog
def getJPG():
    '''Function to get image location and open it with Pillow'''
    global im1
    import_file_path = filedialog.askopenfilename()  # Open file dialog to select a file
    im1 = Image.open(import_file_path)  # Open the selected file with Pillow and store it in im1

# Set common font and button colors
font = ('helvetica', 24, 'bold')
bg = 'black'
fg = 'black'

# Create a button to browse and import a JPEG file
browseButton_JPG = tk.Button(text="    Import JPEG File    ", command=getJPG, bg=bg, fg=fg, font=font)
canvas1.create_window(200, 120, window=browseButton_JPG)  # Add the button to the canvas at position (200, 120)

# Function to convert the imported JPEG file to PNG and save it
def convertToPNG():
    '''Function to change file extension to PNG and save it to User's preferred location'''
    global im1
    if im1 is None:  # Check if an image has been selected
        tk.messagebox.showerror("Error", "No File selected")  # Show error if no file is selected
    else:
        export_file_path = filedialog.asksaveasfilename(defaultextension='.png')  # Open dialog to save the file as PNG
        im1.save(export_file_path)  # Save the file as a PNG

# Create a button to convert the JPEG file to PNG
saveAsButton_PNG = tk.Button(text='Convert JPEG to PNG', command=convertToPNG, bg=bg, fg=fg, font=font)
canvas1.create_window(200, 180, window=saveAsButton_PNG)  # Add the button to the canvas at position (200, 180)

# Run the GUI application
root.mainloop()