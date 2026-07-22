import { useParams, Link as RouterLink } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import Typography from '@mui/material/Typography'
import Link from '@mui/material/Link'
import Button from '@mui/material/Button'
import { getDocPage } from '@/data/docs'

export function DocArticle() {
  const { id } = useParams()
  const doc = id ? getDocPage(id) : undefined

  if (!doc) {
    return (
      <Box>
        <Typography variant="h4" sx={{ mb: 1 }}>
          Document not found
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          That document doesn’t exist. It may have been renamed or moved.
        </Typography>
        <Button component={RouterLink} to="/docs" variant="contained">
          Back to documentation
        </Button>
      </Box>
    )
  }

  return (
    <Box sx={{ display: 'flex', gap: 4, alignItems: 'flex-start' }}>
      <Card
        component="nav"
        aria-label="On this page"
        sx={{ p: 2, width: 240, flexShrink: 0, display: { xs: 'none', md: 'block' } }}
      >
        <Typography variant="overline" color="text.secondary">
          On this page
        </Typography>
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.75, mt: 1 }}>
          {doc.sections.map((section) => (
            <Link key={section.id} href={`#${section.id}`} variant="body2" underline="hover">
              {section.heading}
            </Link>
          ))}
        </Box>
      </Card>

      <Box sx={{ maxWidth: 720, minWidth: 0 }}>
        <Typography variant="overline" color="text.secondary">
          ØAE Docs
        </Typography>
        <Typography variant="h3" component="h1" sx={{ mb: 1 }}>
          {doc.title}
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          {doc.summary}
        </Typography>
        {doc.sections.map((section) => (
          <Box
            key={section.id}
            id={section.id}
            component="section"
            sx={{ mb: 3, scrollMarginTop: 16 }}
          >
            <Typography variant="h5" component="h2" sx={{ mb: 1 }}>
              {section.heading}
            </Typography>
            {section.body.map((paragraph, index) => (
              <Typography key={index} variant="body1" sx={{ mb: 1.5 }}>
                {paragraph}
              </Typography>
            ))}
          </Box>
        ))}
      </Box>
    </Box>
  )
}
