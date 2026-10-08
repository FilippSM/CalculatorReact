import { useThemeStore } from "@/app/store"
import palette from "@/shared/styles/colors.module.scss"
import {
  MoveDirection,
  OutMode,
  type Engine,
  type ISourceOptions,
} from "@tsparticles/engine"
import Particles, { ParticlesProvider } from "@tsparticles/react"
import { loadSlim } from "@tsparticles/slim"
import { useMemo } from "react"
import styles from "./ParticlesBackground.module.scss"

const PARTICLE_COLORS = {
  light: palette.dark100, // color(dark, 100)
  dark: palette.light100, // color(light, 100)
} as const

const initParticles = async (engine: Engine) => {
  await loadSlim(engine)
}

const ParticlesCanvas = () => {
  const theme = useThemeStore((state) => state.theme)
  const color = PARTICLE_COLORS[theme]

  const options: ISourceOptions = useMemo(
    () => ({
      fullScreen: {
        enable: true,
        zIndex: 0,
      },
      background: {
        color: {
          value: "transparent",
        },
      },
      fpsLimit: 60,
      particles: {
        paint: {
          fill: {
            enable: true,
            color: {
              value: color,
            },
            opacity: 0.5,
          },
        },
        links: {
          color: {
            value: color,
          },
          distance: 150,
          enable: true,
          opacity: 0.4,
          width: 1,
        },
        move: {
          direction: MoveDirection.top,
          enable: true,
          outModes: {
            default: OutMode.out,
          },
          random: false,
          speed: 3,
          straight: false,
        },
        number: {
          density: {
            enable: true,
          },
          value: 80,
        },
        shape: {
          type: "circle",
        },
        size: {
          value: { min: 1, max: 3 },
        },
      },
      detectRetina: true,
    }),
    [color],
  )

  return <Particles id="tsparticles" className={styles.particles} options={options} />
}

export const ParticlesBackground = () => (
  <ParticlesProvider init={initParticles}>
    <ParticlesCanvas />
  </ParticlesProvider>
)
