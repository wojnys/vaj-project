import { Request, Response } from 'express';
import { Joke, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

// Get all jokes
export const getJokes = async (req: Request, res: Response): Promise<void> => {
  try {
    const jokes: Joke[] = await prisma.joke.findMany(); // Fetch all jokes from the database using Prisma
    console.log('jokes', jokes);
    res.status(200).json(jokes);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching jokes' });
  }
};

// Get joke by ID
export const getJokeById = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const joke: Joke | null = await prisma.joke.findUnique({
      where: { id: parseInt(req.params.id, 10) },
    }); // Fetch joke by ID using Prisma
    if (!joke) {
      res.status(404).json({ message: 'Joke not found' });
      return;
    }
    res.status(200).json(joke);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching joke' });
  }
};

// Create a new joke
export const createJoke = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    // const { data } = req.body;
    console.log('data', req.body);

    const newJoke: Joke = await prisma.joke.create({
      data: {
        title: req.body.title,
        content: req.body.content,
        category: req.body.category,
        createdAt: new Date(),
        authorId: 1,
      },
    }); // Create a new joke using Prisma
    res.status(201).json(newJoke);
  } catch (err) {
    res.status(400).json({ message: 'Error creating joke' });
  }
};

// Update a joke by ID
export const updateJoke = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const updatedJoke: Joke | null = await prisma.joke.update({
      where: { id: parseInt(req.params.id, 10) },
      data: req.body,
    });
    if (!updatedJoke) {
      res.status(404).json({ message: 'Joke not found' });
      return;
    }

    res.status(200).json(updatedJoke);
  } catch (err) {
    res.status(400).json({ message: 'Error updating joke' });
  }
};

// Delete a joke by ID
export const deleteJoke = async (
  req: Request,
  res: Response,
): Promise<void> => {
  try {
    const deleted: Joke | null = await prisma.joke.delete({
      where: { id: parseInt(req.params.id, 10) },
    });
    if (!deleted) {
      res.status(404).json({ message: 'Joke not found' });
      return;
    }
    res.status(200).json({ message: 'Joke deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting joke' });
  }
};

export const randomJoke = async (
  req: Request,
  res: Response,
): Promise<void> => {
  const { category } = req.query;
  console.log('category', category);
  try {
    const count = await prisma.joke.count({
      where: {
        category: category ? String(category) : undefined,
      },
    });
    const randomIndex = Math.floor(Math.random() * count); // Generate a random index

    const randomJoke: Joke | null = await prisma.joke.findFirst({
      where: category ? { category: String(category) } : undefined,
      take: 1,
      skip: randomIndex,
    }); // Fetch a random joke using the generated index
    if (!randomJoke) {
      res.status(404).json({ message: 'Joke not found' });
      return;
    }
    res.status(200).json(randomJoke);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching random joke' });
  }
};
