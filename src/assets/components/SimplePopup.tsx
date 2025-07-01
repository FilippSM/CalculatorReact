import * as React from "react"
import Popover from "@mui/material/Popover"
import Typography from "@mui/material/Typography"
import Button from "@mui/material/Button"

export function SimplePopup() {
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null)

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const open = Boolean(anchorEl)
  const id = open ? "simple-popover" : undefined

  return (
    <div>
      <Button aria-describedby={id} variant="contained" onClick={handleClick} sx={{ textTransform: "none" }}>
        i
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        slotProps={{
          paper: {
            style: {
              width: "400px",
              maxHeight: "60vh",
              overflow: "auto",
              padding: "16px",
            },
          },
        }}
      >
        <Typography sx={{ p: 2 }}>Для автоматического расчета для нескольких значений надо ввести иданные через пробел: 981 982</Typography>
      </Popover>
    </div>
  )
}
