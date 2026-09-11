import bcrypt from "bcrypt";
import prisma from "./src/lib/prisma.js";

async function createAdmin() {
  try {
    const name = "Administrador";
    const email = "admin@email.com";
    const password = "123456";

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      console.log("❌ Já existe um usuário com esse e-mail.");
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const admin = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "ADMIN",
      },
    });

    console.log("✅ Administrador criado com sucesso!");
    console.log(`Nome: ${admin.name}`);
    console.log(`E-mail: ${admin.email}`);
    console.log(`ID: ${admin.id}`);
  } catch (error) {
    console.error("❌ Erro ao criar administrador:", error);
  } finally {
    await prisma.$disconnect();
  }
}

createAdmin();