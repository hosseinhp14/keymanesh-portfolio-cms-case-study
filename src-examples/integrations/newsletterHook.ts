import client from '@sendgrid/client'
import type { CollectionAfterChangeHook } from 'payload'

// Sanitized version of the production newsletter form hook.
// Dedicated credentials are used instead of reusing SMTP configuration.
export const addNewsletterSubscriber: CollectionAfterChangeHook = async ({ doc }) => {
  const apiKey = process.env.SENDGRID_API_KEY
  if (!apiKey) return doc

  const form = doc.form
  if (typeof form !== 'object' || !form?.title?.toLowerCase().includes('newsletter')) {
    return doc
  }

  const emailField = Array.isArray(doc.submissionData)
    ? doc.submissionData.find((field) => field.field?.toLowerCase() === 'email')
    : undefined

  const email = emailField?.value?.toString().trim()
  if (!email) return doc

  client.setApiKey(apiKey)

  await client.request({
    method: 'PUT',
    url: '/v3/marketing/contacts',
    body: { contacts: [{ email }] },
  })

  // Deliberately do not log subscriber PII.
  return doc
}
