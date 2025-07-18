import { PrismaClient } from "@prisma/client";
import { hashSync } from "bcrypt";

const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "user@tenant1.com",
      password: hashSync("pass", 10), // Hash password with salt rounds 10
      role: "user",
      tenantId: "tenant1",
    },
  });
  console.log("Seeded users");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => await prisma.$disconnect());