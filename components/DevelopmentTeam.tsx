import React from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { cn } from '@/lib/utils'
import type { Dictionary } from '@/lib/dictionary'

interface Developer {
  name: string
  role: string
}

interface DevelopmentTeamProps {
  dict: Dictionary
  studioName: string
  studioDescription?: string
  keyDevelopers: Developer[]
  publisher?: string
  className?: string
}

export default function DevelopmentTeam({
  dict,
  studioName,
  studioDescription,
  keyDevelopers,
  publisher,
  className,
}: DevelopmentTeamProps) {
  return (
    <section className={cn('py-16 md:py-24', className)}>
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          {dict.developmentTeam.title}
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {dict.developmentTeam.studioName}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold mb-2">{studioName}</p>
              {studioDescription && (
                <p className="text-muted-foreground">{studioDescription}</p>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="text-xl">
                {dict.developmentTeam.keyDevelopers}
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {keyDevelopers.map((developer, index) => (
                  <div
                    key={index}
                    className="p-4 rounded-lg  border"
                  >
                    <p className="font-semibold">{developer.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {developer.role}
                    </p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {publisher && (
            <Card>
              <CardHeader>
                <CardTitle className="text-xl">
                  {dict.developmentTeam.publisher}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-lg font-semibold">{publisher}</p>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </section>
  )
}
