import { container } from '@/config/bootstrap'
import type { NextApiRequest, NextApiResponse } from 'next'

const authController = container.resolve('AuthController')

/**
 * Handles logging out the user.
 * 
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  await authController.logOut(req, res)
}
