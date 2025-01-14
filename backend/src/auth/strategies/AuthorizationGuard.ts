import { Injectable, CanActivate, ExecutionContext, UnauthorizedException, forwardRef, Inject } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from '../decrators/role.decrator';
import { Role } from 'src/constants/roles.enum';



@Injectable()
export class AuthorizationGuard implements CanActivate {
    constructor(private reflector: Reflector) {}

    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.getAllAndOverride<Role[]>(ROLES_KEY, [
            context.getHandler(),
            context.getClass(),
        ]);
        if (!requiredRoles) {
            return true; // No roles specified, allow access
        }

        const { user } = context.switchToHttp().getRequest(); // Get user from request object
        console.log('Required Roles:', requiredRoles); // Debugging
        console.log('User Role:', user.role);
        if (!user) {
            throw new UnauthorizedException('User not attached');
        }

        const userRole = user.role;
        if (!requiredRoles.includes(userRole)) {
            throw new UnauthorizedException('Unauthorized access');
        }

        return true;
    }
}
