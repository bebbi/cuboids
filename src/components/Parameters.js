import React from 'react'
import Form from 'react-jsonschema-form'

const uiSchemaFrom = definitions =>
  Object.assign(
    {},
    ...Object.keys(definitions)
      .filter(p => definitions[p].type === 'integer')
      .map(p => ({ [p]: { 'ui:widget': 'range' } }))
  )

const formatSchema = definitions => ({
  type: 'object',
  properties: definitions
})

const Parameters = ({ definitions, params, onEdit }) => (
  <Form
    schema={formatSchema(definitions)}
    formData={params}
    uiSchema={uiSchemaFrom(definitions)}
    onChange={({ formData }) => onEdit(formData)}
  />
)

export default Parameters
