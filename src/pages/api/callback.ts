// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { container } from '@/config/bootstrap'
const authController = container.resolve('AuthController')

/**
 * Handles the callback route for GitLab authentication.
 * 
 * @param {NextApiRequest} req - The request object.
 * @param {NextApiResponse} res - The response object.
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  try {
    await authController.callback(req, res)
  } catch (error) {
    res.redirect('/')
  }

}
