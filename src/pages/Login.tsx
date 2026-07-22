import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Box from '@mui/material/Box'
import Card from '@mui/material/Card'
import CardActionArea from '@mui/material/CardActionArea'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import WindowOutlined from '@mui/icons-material/WindowOutlined'
import { EnergyFlowUnderline } from '@/components/ui/EnergyFlowUnderline'
import { personas } from '@/data/personas'
import { usePersonaStore } from '@/store/usePersonaStore'
import type { PersonaId } from '@/types'

export function Login() {
  const signIn = usePersonaStore((s) => s.signIn)
  const navigate = useNavigate()
  const [showPersonas, setShowPersonas] = useState(false)

  const choosePersona = (id: PersonaId) => {
    signIn(id)
    navigate('/')
  }

  return (
    <Box
      sx={(t) => ({
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        p: 2,
        backgroundImage: `radial-gradient(80% 90% at 20% -10%, ${t.tokens.color.brand.accent}, transparent 60%), linear-gradient(160deg, ${t.tokens.color.brand.primaryStrong}, ${t.tokens.color.brand.primary})`,
      })}
    >
      <Card sx={{ p: 4, width: '100%', maxWidth: 460 }}>
        <Box sx={{ display: 'flex', alignItems: 'baseline', gap: 0.5 }}>
          <Typography variant="h3" component="span" sx={{ color: 'primary.main' }}>
            ØAE
          </Typography>
          <Typography variant="h3" component="span">
            Portal
          </Typography>
        </Box>
        <Box sx={{ my: 1.5 }}>
          <EnergyFlowUnderline />
        </Box>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
          Find approved AI tools, ask questions, and request access. Run by the
          Ørsted AI Ecosystem team.
        </Typography>

        {!showPersonas ? (
          <Button
            variant="contained"
            fullWidth
            size="large"
            startIcon={<WindowOutlined />}
            onClick={() => setShowPersonas(true)}
          >
            Sign in with Microsoft
          </Button>
        ) : (
          <Box>
            <Typography variant="subtitle2" sx={{ mb: 1.5 }}>
              Choose a persona for the demo
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {personas.map((persona) => (
                <Card key={persona.id} variant="outlined">
                  <CardActionArea
                    sx={{ p: 2 }}
                    onClick={() => choosePersona(persona.id)}
                  >
                    <Typography variant="subtitle1">
                      {persona.roleLabel}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {persona.description}
                    </Typography>
                  </CardActionArea>
                </Card>
              ))}
            </Box>
          </Box>
        )}

        <Typography
          variant="caption"
          color="text.secondary"
          sx={{ display: 'block', mt: 3 }}
        >
          Internal use only · Ørsted A/S
        </Typography>
      </Card>
    </Box>
  )
}
