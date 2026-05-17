const getDictionaryData = () => import('@/dictionaries/en.json').then((module) => module.default)

export const getDictionary = async () => {
  return getDictionaryData()
}

export type Dictionary = Awaited<ReturnType<typeof getDictionary>>
