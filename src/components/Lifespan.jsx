import { FormControl, Select, MenuItem } from '@mui/material'
import { useBetween } from 'use-between'
import { useTime } from '../hooks/useTime'

const Lifespan = () => {
  const { lifespan, setLifespan } = useBetween(useTime)

  const lifespanOptions = Array.from({ length: 121 }, (_, i) => i + 1)

  return (
    <FormControl className="lifespan-form">
      <Select 
        value={lifespan}
        onChange={(e) => setLifespan(e.target.value)}
        displayEmpty
        inputProps={{ "aria-label": "Without label" }}
      >
        {lifespanOptions.map((lifespan) => (
          <MenuItem key={lifespan} value={lifespan}>
            {lifespan}
          </MenuItem>
        ))}
      </Select>

    </FormControl>
  )
}

export default Lifespan