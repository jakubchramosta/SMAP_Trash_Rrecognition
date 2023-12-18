import PIL
import tensorflow as tf

model = tf.keras.models.load_model("./output/keras/keras_morel.keras")

img_height = 180
img_width = 180

# Assuming 'image_path' is the path to a new image
img = PIL.Image.open('./dataset/train/plastic/plastic1.jpg').resize((img_height, img_width))
img_array = tf.keras.preprocessing.image.img_to_array(img)
img_array = tf.expand_dims(img_array, 0)  # Create a batch

predictions = model.predict(img_array)
score = tf.nn.softmax(predictions[0])

print(f"Prediction arr: {predictions}")
print(f"Score: {score}")