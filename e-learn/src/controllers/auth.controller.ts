// controllers/AuthController.ts
import speakeasy from 'speakeasy';

export const enableMFA = async (req: Request, res: Response) => {
  try {
    const user = await User.findById(req.user?.userId);
    if (!user) return res.status(404).json({ error: 'User not found' });

    // Generate a secret key for TOTP
    const { base32 } = speakeasy.generateSecret({ length: 20 });
    user.mfaSecret = base32;
    user.isMFAEnabled = true;
    await user.save();

    res.json({ secret: base32 });
  } catch (error) {
    res.status(500).json({ error: 'Failed to enable MFA' });
  }
};