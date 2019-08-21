import Color, { AirportAppColor } from '../../utils/color'

export const Theme = {
  default: {
    color: {
      primary: Color.DarkGreen,
      secondary: Color.Cyan,
      accent: Color.Cyan,
      highlight: Color.Cyan,
      text: Color.DarkGreen,
    },
  },
  airport: {
    color: {
      primary: AirportAppColor.Red,
      secondary: AirportAppColor.Red,
      accent: AirportAppColor.Turquoise,
      highlight: Color.Cyan,
      text: Color.Black,
    },
  },
}
