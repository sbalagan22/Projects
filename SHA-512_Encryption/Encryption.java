import java.math.BigInteger;
import java.nio.charset.StandardCharsets;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;

public class PasswordEncryption {

    /**
     * Computes the SHA-512 hash of a given input string.
     * @param input The string to be hashed.
     * @return A byte array containing the SHA-512 hash of the input.
     * @throws NoSuchAlgorithmException If the SHA-512 algorithm is not available.
     */
    public static byte[] computeSHA512(String input) throws NoSuchAlgorithmException {
        // Create a MessageDigest instance for SHA-512 hashing
        MessageDigest digest = MessageDigest.getInstance("SHA-512");
        
        // Perform the hashing and return the resulting byte array
        return digest.digest(input.getBytes(StandardCharsets.UTF_8));
    }

    /**
     * Converts a byte array to a hexadecimal string.
     * @param hash The byte array to be converted.
     * @return A hexadecimal string representation of the byte array.
     */
    public static String convertToHexString(byte[] hash) {
        // Convert the byte array to a BigInteger
        BigInteger bigInt = new BigInteger(1, hash);
        
        // Convert the BigInteger to a hexadecimal string
        String hexString = bigInt.toString(16);
        
        // Ensure the string has the correct length by padding with zeros if necessary
        StringBuilder paddedHexString = new StringBuilder(hexString);
        while (paddedHexString.length() < 128) { // 128 = 2 * 64 (for SHA-512)
            paddedHexString.insert(0, '0');
        }
        
        return paddedHexString.toString();
    }

    /**
     * Main method to test the SHA-512 hashing and hexadecimal conversion.
     * @param args Command line arguments (not used).
     */
    public static void main(String[] args) {
        try {
            // Input The Desired Phrashe to HASH
            String password1 = "Hi";
            System.out.println(password1 + " : " + convertToHexString(computeSHA512(password1)));
            
        } catch (NoSuchAlgorithmException e) {
            System.err.println("Error: " + e.getMessage());
        }
    }
}