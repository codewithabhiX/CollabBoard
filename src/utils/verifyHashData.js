import bcrypt from "bcrypt"

const verifyHashedData = async (data, hashedData) => {
  console.log("Verifying data:", data); // Debugging log
  console.log("Hashed data:", hashedData); // Debugging log
  try {
    return await bcrypt.compare(data, hashedData);
  } catch (error) {
    throw new Error('Verification error');
  }
};

export default verifyHashedData;