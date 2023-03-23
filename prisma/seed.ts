import { PrismaClient } from "@prisma/client";
import * as argon from "argon2";
const prisma = new PrismaClient();
async function main() {
  const hash = await argon.hash("123456");
  const admin = await prisma.user.upsert({
    where: { username: "admin" },
    update: {},
    create: {
      username: "admin",
      password: hash,
      firstName: "Trung",
      lastName: "Nguyễn",
    },
  });
  console.log(admin);
}
main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
