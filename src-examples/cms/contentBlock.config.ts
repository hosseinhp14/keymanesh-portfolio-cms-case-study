import type { Block, Field } from 'payload'
import {
  BlocksFeature,
  FixedToolbarFeature,
  HeadingFeature,
  HorizontalRuleFeature,
  InlineToolbarFeature,
  lexicalEditor,
} from '@payloadcms/richtext-lexical'

import { FontColorFeature } from '../editor/fontColorFeature.server'

// Representative excerpt from the production content builder.
const columnFields: Field[] = [
  {
    name: 'size',
    type: 'select',
    defaultValue: 'oneThird',
    options: [
      { label: 'One Third', value: 'oneThird' },
      { label: 'Half', value: 'half' },
      { label: 'Two Thirds', value: 'twoThirds' },
      { label: 'Full', value: 'full' },
    ],
  },
  {
    name: 'richText',
    type: 'richText',
    label: false,
    editor: lexicalEditor({
      features: ({ defaultFeatures }) => [
        ...defaultFeatures,
        HeadingFeature({ enabledHeadingSizes: ['h1', 'h2', 'h3', 'h4', 'h5'] }),
        // The production project registers reusable media/content blocks here.
        BlocksFeature({ blocks: [] }),
        FixedToolbarFeature(),
        InlineToolbarFeature(),
        HorizontalRuleFeature(),
        FontColorFeature(),
      ],
    }),
  },
  {
    name: 'enableLink',
    type: 'checkbox',
  },
]

export const ContentBlock: Block = {
  slug: 'content',
  interfaceName: 'ContentBlock',
  fields: [
    {
      name: 'columns',
      type: 'array',
      admin: { initCollapsed: true },
      fields: columnFields,
    },
  ],
}
