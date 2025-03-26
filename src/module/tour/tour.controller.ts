import { Request, Response } from "express";
import { tourService } from "./tour.service";

const createTour = async (req: Request, res: Response) => {
    const body = req.body
    const result = tourService.createTour()
}