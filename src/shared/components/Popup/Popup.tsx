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
      <Button
        aria-describedby={id}
        variant="outlined"
        onClick={handleClick}
        sx={{
          textTransform: "none",
          backgroundColor: "#ffeb3b", // Желтый цвет
          color: "rgba(0, 0, 0, 0.87)", // Цвет текста (черный)
          minWidth: "24px", // Минимальная ширина
          width: "24px", // Фиксированная ширина
          height: "24px", // Фиксированная высота
          padding: "4px", // Внутренние отступы
          "&:hover": {
            backgroundColor: "#ffd600", // Цвет при наведении (темнее)
          },
        }}
      >
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
        <Typography sx={{ p: 2 }}>
          Расчет происходит автоматически, необходимо ввести данные в поле Density и Temperature
        </Typography>
      </Popover>
    </div>
  )
}
