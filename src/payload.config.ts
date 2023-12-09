import path from 'path'

import { payloadCloud } from '@payloadcms/plugin-cloud'
import { mongooseAdapter } from '@payloadcms/db-mongodb'
import { webpackBundler } from '@payloadcms/bundler-webpack'
import { slateEditor } from '@payloadcms/richtext-slate'
import { buildConfig } from 'payload/config'

import Users from './collections/Users'
import Cars from './collections/Cars'
import Images from './collections/Images'
const mockModulePath = path.resolve(__dirname, './emptyModuleMock.js')

export default buildConfig({
  admin: {
    user: Users.slug,
    bundler: webpackBundler(),
    webpack: config => ({
      ...config,
      resolve: {
        ...config.resolve,
        alias: {
          ...config.resolve.alias,
          [path.resolve(__dirname, 'handlers/uploadImageHandler')]: mockModulePath,
    //       buffer: "buffer",
            //  multer:mockModulePath,
    //       // OR extract your `beforeOperation` function into it's own file and alias THAT
        }
      },
    })
  },
  editor: slateEditor({}),
  collections: [Users,Cars,Images],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
  graphQL: {
    schemaOutputFile: path.resolve(__dirname, 'generated-schema.graphql'),
  },
  plugins: [payloadCloud()],
  db: mongooseAdapter({
    url: process.env.DATABASE_URI,
  }),
})
