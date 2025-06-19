import { headers } from 'next/headers'

export async function getCanonicalUrl(path: string): Promise<string> {
  const headersList = await headers()
  const host = headersList.get('host') || 'freetools.site'
  const protocol = process.env.NODE_ENV === 'production' ? 'https' : 'http'
  return `${protocol}://${host}${path}`
}

export function getAlternateLanguageUrls(path: string): { [key: string]: string } {
  const baseUrl = 'https://freetools.site'
  // Add more languages as needed
  return {
    'en-US': `${baseUrl}${path}`,
    'es': `${baseUrl}/es${path}`,
    'fr': `${baseUrl}/fr${path}`,
  }
}

export async function generateMetadata(params: {
  title: string
  description: string
  path: string
  ogImage?: string
  keywords?: string[]
}) {
  const { title, description, path, ogImage, keywords } = params
  const canonicalUrl = await getCanonicalUrl(path)
  const alternateUrls = getAlternateLanguageUrls(path)

  return {
    title,
    description,
    keywords,
    alternates: {
      canonical: canonicalUrl,
      languages: alternateUrls,
    },
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      siteName: 'FreeTools.online',
      images: ogImage ? [{ url: ogImage }] : undefined,
      locale: 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined,
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}
