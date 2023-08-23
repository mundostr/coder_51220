/**
 * Middleware que muestra información sobre la ruta visitada
 */

import { NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

export default class showRouteInfo implements NestMiddleware {
    use (req: Request, res: Response, next: NextFunction) {
        console.log(`Solicitud ${req.method} ${req.url} (${new Date().toLocaleString()})`)
        next()
    }
}