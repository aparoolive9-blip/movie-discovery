import { Chip, Box } from '@mui/material';

export default function GenreFilter({ genres, selected, onSelect }) {
  return (
    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 2 }}>
      <Chip
        label="All"
        color={selected === '' ? 'primary' : 'default'}
        onClick={() => onSelect('')}
      />
      {genres.map((genre) => (
        <Chip
          key={genre.id}
          label={genre.name}
          color={selected === genre.id ? 'primary' : 'default'}
          onClick={() => onSelect(genre.id)}
        />
      ))}
    </Box>
  );
}