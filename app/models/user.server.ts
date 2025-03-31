import type { Password, User } from "@prisma/client";
import bcrypt from "bcryptjs";

import prisma from "~/lib/prisma";

export type { User } from "@prisma/client";

export async function getUserById(id: User["id"]) {
	return prisma.user.findUnique({ where: { id } });
}

export async function getUserByEmail(email: User["email"]) {
	return prisma.user.findUnique({ where: { email } });
}

export async function createUser(email: User["email"], password: string) {
	const hashedPassword = await bcrypt.hash(password, 10);

	return prisma.user.create({
		data: {
			email,
			username: email.split("@")[0],
			password: {
				create: {
					hash: hashedPassword,
				},
			},
		},
	});
}

export async function updateUser(email: User["email"], data: Partial<User>) {
	return prisma.user.update({ where: { email }, data });
}

export async function deleteUserByEmail(email: User["email"]) {
	return prisma.user.delete({ where: { email } });
}

export async function verifyLogin(email: User["email"], password: string) {
	const userWithPassword = await prisma.user.findUnique({
		where: { email },
		include: {
			password: true, // Ensure the password relation is included
		},
	});

	if (!userWithPassword || !userWithPassword.password) {
		return null; // User not found or no password associated
	}

	// Compare the plain-text password with the hashed password
	const isValid = await bcrypt.compare(
		password,
		userWithPassword.password.hash
	);

	if (!isValid) {
		return null; // Password is invalid
	}

	// Exclude the password from the returned user object
	const { password: _password, ...userWithoutPassword } = userWithPassword;

	return userWithoutPassword; // Return the user without the password
}
