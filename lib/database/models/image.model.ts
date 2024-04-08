import { Document, Schema, model, models } from "mongoose";

// Define the interface for the image document
export interface IImage extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  secureURL: string; 
  width?: number;
  height?: number;
  config?: object; 
  transformationUrl?: string; 
  aspectRatio?: string;
  color?: string;
  prompt?: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  }
  createdAt?: Date;
  updatedAt?: Date;
}

// Define the schema for the image document
const ImageSchema = new Schema({
  title: { type: String, required: true }, // Title of the image
  transformationType: { type: String, required: true }, // Type of transformation applied to the image
  publicId: { type: String, required: true }, // Public ID of the image (e.g., in cloud storage)
  secureURL: { type: String, required: true }, // Secure URL of the image
  width: { type: Number }, // Width of the image
  height: { type: Number }, // Height of the image
  config: { type: Object }, // Configuration object (if any) for the image
  transformationUrl: { type: String }, // URL of the transformation applied to the image
  aspectRatio: { type: String }, // Aspect ratio of the image
  color: { type: String }, // Color of the image
  prompt: { type: String }, // Prompt associated with the image
  author: { type: Schema.Types.ObjectId, ref: 'User' }, // Author of the image (referenced to User model)
  createdAt: { type: Date, default: Date.now }, // Timestamp indicating when the image was created
  updatedAt: { type: Date, default: Date.now } // Timestamp indicating when the image was last updated
});

// Create the Image model from the schema
const Image = models?.Image || model('Image', ImageSchema);

// Export the Image model
export default Image;
