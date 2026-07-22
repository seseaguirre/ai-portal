import { useState, type FormEvent } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import IconButton from '@mui/material/IconButton'
import SearchOutlined from '@mui/icons-material/SearchOutlined'
import ArrowForwardOutlined from '@mui/icons-material/ArrowForwardOutlined'
import { EnergyFlowUnderline } from '@/components/ui/EnergyFlowUnderline'

interface SearchBarProps {
  onSubmit: (value: string) => void
  placeholder?: string
  defaultValue?: string
  autoFocus?: boolean
  large?: boolean
  withUnderline?: boolean
}

export function SearchBar({
  onSubmit,
  placeholder,
  defaultValue = '',
  autoFocus = false,
  large = false,
  withUnderline = false,
}: SearchBarProps) {
  const [value, setValue] = useState(defaultValue)

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const trimmed = value.trim()
    if (trimmed) onSubmit(trimmed)
  }

  return (
    <Box component="form" onSubmit={submit}>
      <TextField
        fullWidth
        value={value}
        onChange={(event) => setValue(event.target.value)}
        placeholder={placeholder}
        autoFocus={autoFocus}
        aria-label="Ask the ØAE Portal"
        InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchOutlined color="primary" />
            </InputAdornment>
          ),
          endAdornment: (
            <InputAdornment position="end">
              <IconButton type="submit" aria-label="Search" color="primary">
                <ArrowForwardOutlined />
              </IconButton>
            </InputAdornment>
          ),
          sx: (t) => ({
            borderRadius: `${t.tokens.radii.pill}px`,
            backgroundColor: t.tokens.color.surface.raised,
            boxShadow: t.tokens.elevation.level1,
            '& .MuiOutlinedInput-input': large
              ? { paddingBlock: t.spacing(1.75), fontSize: t.tokens.typography.scale.title.fontSize }
              : undefined,
          }),
        }}
      />
      {withUnderline && (
        <Box sx={{ mt: 1.25, mx: 3 }}>
          <EnergyFlowUnderline />
        </Box>
      )}
    </Box>
  )
}
