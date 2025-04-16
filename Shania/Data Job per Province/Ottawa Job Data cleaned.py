import pandas as pd

# Load the CSV
df = pd.read_csv("Ottawa Job Data.csv")

# Drop unnecessary or empty columns
columns_to_drop = [
    'DGUID', 'UOM_ID', 'SCALAR_FACTOR', 'SCALAR_ID', 'VECTOR',
    'COORDINATE', 'STATUS', 'SYMBOL', 'TERMINATED', 'DECIMALS'
]
df_cleaned = df.drop(columns=columns_to_drop)

# Rename the VALUE column for clarity
df_cleaned = df_cleaned.rename(columns={'VALUE': 'Employment Count (Thousands)'})

# Preview the cleaned data
print(df_cleaned.head())

# Save the cleaned data to a new CSV file
df_cleaned.to_csv("Cleaned_Ottawa_Job_Data.csv", index=False)
