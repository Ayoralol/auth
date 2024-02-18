import * as bcrypt from 'bcrypt';

export const generateHash = async (password: string): Promise<string> => {
  const saltRounds = 12;

  const salt = await bcrypt.genSalt(saltRounds);

  const hashedPass = await bcrypt.hash(password, salt);
  return hashedPass;
};

export const validateHash = async (incoming: string, hash: string) => {
  return await bcrypt.compare(incoming, hash);
};
