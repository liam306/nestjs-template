import { applyDecorators } from '@nestjs/common';
import { ApiResponse } from '@nestjs/swagger';
import { SwaggerResponse } from '../interfaces';

type StatusCode =
  | 200
  | 201
  | 204
  | 400
  | 401
  | 403
  | 404
  | 409
  | 422
  | 429
  | 500
  | 502
  | 503;

const STATUS_DESCRIPTIONS: Record<StatusCode, string> = {
  200: 'Success',
  201: 'Created successfully',
  204: 'No content',
  400: 'Bad request',
  401: 'Unauthorized',
  403: 'Forbidden',
  404: 'Not found',
  409: 'Conflict',
  422: 'Unprocessable entity',
  429: 'Too many requests',
  500: 'Internal server error',
  502: 'Bad gateway',
  503: 'Service unavailable',
};

interface ApiResponsesOptions {
  statusCodes: StatusCode[];
  customDescriptions?: Partial<Record<StatusCode, string>>;
}

export const DefaultResponses = (options: ApiResponsesOptions) => {
  const { statusCodes, customDescriptions = {} } = options;

  const apiResponses = statusCodes.map((statusCode) => {
    const description =
      customDescriptions[statusCode] || STATUS_DESCRIPTIONS[statusCode];

    return ApiResponse({
      status: statusCode,
      description,
      type: SwaggerResponse,
    });
  });

  return applyDecorators(...apiResponses);
};
