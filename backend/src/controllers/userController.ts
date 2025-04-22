import { Request, Response } from 'express';
import { Joke, PrismaClient, User } from '@prisma/client';

const prisma = new PrismaClient();

// Get all jokes
export const getUsers = async (req: Request, res: Response): Promise<void> => {
  try {
    const users: User[] = await prisma.user.findMany(); // Fetch all jokes from the database using Prisma

    res.status(200).json(users);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching jokes' });
  }
};

export const getUsetrById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const user: User | null = await prisma.user.findUnique({
      where: { id: parseInt(req.params.id, 10) },
    });
    // Fetch joke by ID using Prisma
    if (!user) {
      res.status(404).json({ message: 'Joke not found' });
      return;
    }
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching joke' });
  }
};

export const updateUser = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { id } = req.params;
  let { firstname, lastname, username } = req.body;
  firstname = firstname.trim();
  lastname = lastname.trim();
  username = username.trim();

  try {
    const checkUserUsername = await prisma.user.findFirst({
      where: {
        username: req.body.username,
      },
      select: {
        id: true,
      },
    });
    console.log('checkUserUsername', checkUserUsername);
    if (checkUserUsername && checkUserUsername.id !== Number(id)) {
      res.status(400).json({ message: 'Username already exists' });
      return;
    }

    const updatedUser: User | null = await prisma.user.update({
      where: { id: Number(id) },
      data: {
        firstname: firstname,
        lastname: lastname,
        username: username,
      },
    });
    res.status(200).json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: 'Error updating user' });
  }
};
