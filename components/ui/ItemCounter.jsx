import { Box, IconButton, Typography } from '@mui/material'
import { AddCircleOutline, RemoveCircleOutline } from '@mui/icons-material'

const ItemCounter = ({ currentValue, maxValue, onUpdateQuantity }) => {
  const addOrRemove = (value) => {
    if (value === -1) {
      if (currentValue === 1) return
      return onUpdateQuantity(currentValue - 1)
    }

    if (currentValue >= maxValue) return

    onUpdateQuantity(currentValue + 1)
  }

  return (
    <Box display="flex" alignItems="center">
      <IconButton onClick={() => addOrRemove(-1)}>
        <RemoveCircleOutline />
      </IconButton>
      <Typography sx={{ width: 40, textAlign: 'center' }}>
        {currentValue}
      </Typography>
      <IconButton onClick={() => addOrRemove(+1)}>
        <AddCircleOutline />
      </IconButton>
    </Box>
  )
}

export default ItemCounter
