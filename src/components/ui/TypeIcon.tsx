import type { SvgIconProps } from '@mui/material/SvgIcon'
import LanOutlined from '@mui/icons-material/LanOutlined'
import AutoAwesomeOutlined from '@mui/icons-material/AutoAwesomeOutlined'
import HandymanOutlined from '@mui/icons-material/HandymanOutlined'
import SmartToyOutlined from '@mui/icons-material/SmartToyOutlined'
import ArticleOutlined from '@mui/icons-material/ArticleOutlined'
import PlayCircleOutline from '@mui/icons-material/PlayCircleOutline'
import type { AssetType, ResultType } from '@/types'

type IconKind = AssetType | ResultType

const icons: Record<IconKind, typeof LanOutlined> = {
  mcp: LanOutlined,
  skill: AutoAwesomeOutlined,
  tool: HandymanOutlined,
  agent: SmartToyOutlined,
  doc: ArticleOutlined,
  video: PlayCircleOutline,
}

interface TypeIconProps extends SvgIconProps {
  kind: IconKind
}

export function TypeIcon({ kind, ...props }: TypeIconProps) {
  const Icon = icons[kind]
  return <Icon {...props} />
}
