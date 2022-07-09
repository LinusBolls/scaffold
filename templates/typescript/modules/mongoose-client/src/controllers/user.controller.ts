import crypto from "crypto";

import User from "../models/user.model";

const md5hash = (str: string) =>
  crypto.createHash("md5").update(str).digest("hex");

const userController = {
  create: async (data: Partial<typeof User> & { password: string }) => {
    const hash = md5hash(data.password);

    const id = crypto.randomUUID();

    const ding = new User({
      ...data,
      hash,
      id,
    });
    await ding.save();

    return ding;
  },
  get: async (id: string) => {
    const ding = await User.findOne({ id });

    return ding;
  },
  patch: async (id: string, data: Partial<typeof User>) => {
    const doc = await User.findOneAndUpdate({ id }, data, { new: true });
  },
  delete: async (id: string) => {
    const doc = await User.deleteOne({ id });
  },
  changePassword: async (
    id: string,
    { oldPassword, newPassword }: { oldPassword: string; newPassword: string }
  ) => {
    const old = await User.findOne({ id, hash: md5hash(oldPassword) });

    if (old == null) throw new Error("äh dings");

    const doc = await User.findOneAndUpdate(
      { id },
      { hash: md5hash(newPassword) }
    );
  },
};
export default userController;
