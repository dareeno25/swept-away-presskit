import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import { AlertTriangle, FileText, Info } from 'lucide-react'
import type { Dictionary } from '@/lib/dictionary'

interface AdditionalInfoProps {
  dict: Dictionary
  notes?: string
  contentWarnings?: string[]
  assetUsageGuidelines?: string
  className?: string
}

export default function AdditionalInfo({
  dict,
  notes,
  contentWarnings,
  assetUsageGuidelines,
  className,
}: AdditionalInfoProps) {
  if (!notes && !contentWarnings?.length && !assetUsageGuidelines) {
    return null
  }

  return (
    <section className={cn('py-16 md:py-24 ', className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {dict.additionalInfo.title}
        </h2>

        <div className="max-w-3xl mx-auto space-y-6">
          {notes && (
            <Card>
              <CardHeader className="flex flex-row items-center gap-3">
                <Info className="w-5 h-5 text-primary" />
                <CardTitle className="text-xl">
                  {dict.additionalInfo.notes}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line">
                  {notes}
                </p>
              </CardContent>
            </Card>
          )}

          {contentWarnings && contentWarnings.length > 0 && (
            <Card className="border-amber-200 dark:border-amber-900">
              <CardHeader className="flex flex-row items-center gap-3">
                <AlertTriangle className="w-5 h-5 text-amber-500" />
                <CardTitle className="text-xl">
                  {dict.additionalInfo.contentWarnings}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {contentWarnings.map((warning, index) => (
                    <li
                      key={index}
                      className="flex items-start gap-2 text-muted-foreground"
                    >
                      <span className="text-amber-500">&bull;</span>
                      {warning}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>
          )}

          {assetUsageGuidelines && (
            <Card>
              <CardHeader className="flex flex-row items-center gap-3">
                <FileText className="w-5 h-5 text-primary" />
                <CardTitle className="text-xl">
                  {dict.additionalInfo.assetUsage}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground whitespace-pre-line">
                  {assetUsageGuidelines}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
