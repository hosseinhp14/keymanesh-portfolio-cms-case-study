import type { Block, Field } from 'payload'

const externalVideoFields: Field[] = [
  {
    name: 'type',
    type: 'select',
    options: [
      { label: 'YouTube', value: 'youtube' },
      { label: 'Vimeo', value: 'vimeo' },
    ],
    required: true,
  },
  {
    name: 'url',
    type: 'text',
    required: true,
    validate: (value) => {
      if (!value) return true
      try {
        const url = new URL(value)
        const allowedHosts = ['youtube.com', 'www.youtube.com', 'youtu.be', 'vimeo.com', 'www.vimeo.com']
        return allowedHosts.includes(url.hostname) || 'Enter a supported YouTube or Vimeo URL'
      } catch {
        return 'Enter a valid URL'
      }
    },
  },
]

const responsiveMediaFields = (prefix: 'desktop' | 'mobile'): Field[] => [
  {
    name: `${prefix}MediaType`,
    type: 'radio',
    defaultValue: 'upload',
    options: [
      { label: 'Upload Media', value: 'upload' },
      { label: 'External Video', value: 'external' },
    ],
    admin: { layout: 'horizontal' },
  },
  {
    name: `${prefix}Media`,
    type: 'upload',
    relationTo: 'media',
    admin: {
      condition: (_, siblingData) => siblingData?.[`${prefix}MediaType`] === 'upload',
    },
  },
  {
    name: `${prefix}ExternalVideo`,
    type: 'group',
    fields: externalVideoFields,
    admin: {
      condition: (_, siblingData) => siblingData?.[`${prefix}MediaType`] === 'external',
    },
  },
]

export const ReelBlock: Block = {
  slug: 'reelBlock',
  interfaceName: 'ReelBlock',
  fields: [
    { name: 'title', type: 'richText', required: true },
    { name: 'description', type: 'richText', required: true },
    {
      type: 'tabs',
      tabs: [
        { label: 'Desktop Media', fields: responsiveMediaFields('desktop') },
        { label: 'Mobile Media', fields: responsiveMediaFields('mobile') },
      ],
    },
    {
      name: 'layout',
      type: 'select',
      defaultValue: 'textLeft',
      options: [
        { label: 'Text on Left', value: 'textLeft' },
        { label: 'Text on Right', value: 'textRight' },
      ],
      required: true,
    },
    { name: 'backgroundColor', type: 'text', defaultValue: '#FFFFFF' },
  ],
}
