import { createServerFeature } from '@payloadcms/richtext-lexical'

// Registers a custom Lexical toolbar feature with the Payload editor.
export const FontColorFeature = createServerFeature({
  key: 'fontColor',
  feature: {
    ClientFeature: './fontColorFeature.client#FontColorFeatureClient',
  },
})
