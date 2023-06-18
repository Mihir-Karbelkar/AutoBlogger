import { generateReactHelpers } from '@uploadthing/react/hooks';
import { OurFileRouter } from '../api/uploadthing/core';

export const { uploadFiles } = generateReactHelpers<OurFileRouter>();
