import { Box, Button } from '@mui/material'

const SizeSelector = ({ selectedSize, sizes, onSelectedSize }) => {
  return (
    <Box>
      {sizes.map((size) => (
        <Button
          key={size}
          size="small"
          color={selectedSize === size ? 'primary' : 'info'}
          onClick={() => onSelectedSize(size)}
        >
          {size}
        </Button>
      ))}
    </Box>
  )
}

export default SizeSelector
