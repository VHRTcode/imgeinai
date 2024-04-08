// Import necessary dependencies and modules
import { revalidatePath } from "next/cache";
import User from "../database/models/user.model"; // Import the User model
import { connectToDatabase } from "../database/mongoose"; // Import database connection function
import { handleError } from "../utils"; // Import error handling utility

// Function to create a new user
export async function createUser(user: CreateUserParams) {
  try {
    await connectToDatabase(); // Connect to the database

    // Create a new user using the User model
    const newUser = await User.create(user);

    // Return the newly created user
    return JSON.parse(JSON.stringify(newUser));
  } catch (error) {
    // Handle any errors that occur during user creation
    handleError(error);
  }
}

// Function to retrieve a user by their ID
export async function getUserById(userId: string) {
  try {
    await connectToDatabase(); // Connect to the database

    // Find the user with the specified clerkId
    const user = await User.findOne({ clerkId: userId });

    // If user is not found, throw an error
    if (!user) throw new Error("User not found");

    // Return the found user
    return JSON.parse(JSON.stringify(user));
  } catch (error) {
    // Handle any errors that occur during user retrieval
    handleError(error);
  }
}

// Function to update a user
export async function updateUser(clerkId: string, user: UpdateUserParams) {
  try {
    await connectToDatabase(); // Connect to the database

    // Find and update the user with the specified clerkId
    const updatedUser = await User.findOneAndUpdate({ clerkId }, user, {
      new: true,
    });

    // If user update fails, throw an error
    if (!updatedUser) throw new Error("User update failed");

    // Return the updated user
    return JSON.parse(JSON.stringify(updatedUser));
  } catch (error) {
    // Handle any errors that occur during user update
    handleError(error);
  }
}

// Function to delete a user
export async function deleteUser(clerkId: string) {
  try {
    await connectToDatabase(); // Connect to the database

    // Find the user to delete
    const userToDelete = await User.findOne({ clerkId });

    // If user is not found, throw an error
    if (!userToDelete) {
      throw new Error("User not found");
    }

    // Delete the user
    const deletedUser = await User.findByIdAndDelete(userToDelete._id);
    revalidatePath("/");

    // Return the deleted user if exists, otherwise return null
    return deletedUser ? JSON.parse(JSON.stringify(deletedUser)) : null;
  } catch (error) {
    // Handle any errors that occur during user deletion
    handleError(error);
  }
}

// Function to update user credits
export async function updateCredits(userId: string, creditFee: number) {
  try {
    await connectToDatabase(); // Connect to the database

    // Update user credits by incrementing/decrementing credit balance
    const updatedUserCredits = await User.findOneAndUpdate(
      { _id: userId },
      { $inc: { creditBalance: creditFee }},
      { new: true }
    );

    // If user credits update fails, throw an error
    if (!updatedUserCredits) throw new Error("User credits update failed");

    // Return the updated user credits
    return JSON.parse(JSON.stringify(updatedUserCredits));
  } catch (error) {
    // Handle any errors that occur during user credits update
    handleError(error);
  }
}

