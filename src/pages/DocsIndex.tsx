import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import ArticleOutlined from '@mui/icons-material/ArticleOutlined'
import { PageHeader } from '@/components/ui/PageHeader'
import { docPages } from '@/data/docs'

export function DocsIndex() {
  const navigate = useNavigate()

  return (
    <Box>
      <PageHeader
        title="Documentation"
        subtitle="Plain-language guides to using AI at Ørsted, from getting started to model approval."
      />
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
          gap: 2,
          maxWidth: 900,
        }}
      >
        {docPages.map((doc) => (
          <Card key={doc.id}>
            <CardActionArea sx={{ p: 3 }} onClick={() => navigate(`/docs/${doc.id}`)}>
              <ArticleOutlined color="primary" sx={{ mb: 1 }} />
              <Typography variant="h6">{doc.title}</Typography>
              <Typography variant="body2" color="text.secondary">
                {doc.summary}
              </Typography>
            </CardActionArea>
          </Card>
        ))}
      </Box>
    </Box>
  )
}
