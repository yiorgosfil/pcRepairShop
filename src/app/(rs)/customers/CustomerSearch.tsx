import Form from 'next/form'
import SearchButton from '@/components/SearchButton'
import { Input } from '@/components/ui/input'

export default function CustomerSearch() {
  return (
    <Form
      action='/customers'
      className='flex gap-2 items-center'
    >
      <Input
        name='searchText'
        type='text'
        placeholder='Klant zoeken'
        className='w-full'
      />
      <SearchButton />
    </Form>
  )
}
