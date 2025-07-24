import bcrypt from "bcryptjs";

export function generatePasswordHash(password: string) {
  return bcrypt.hashSync(password);
}

export async function comparePasswordHash(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}
